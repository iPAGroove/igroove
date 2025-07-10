// flame.frag

precision highp float;
uniform vec2 iResolution; // Разрешение (ширина, высота) канваса
uniform float iTime;      // Время

//////////////////////
// Fire Flame shader

// procedural noise from IQ
vec2 hash( vec2 p )
{
	p = vec2( dot(p,vec2(127.1,311.7)),
			 dot(p,vec2(269.5,183.3)) );
	return -1.0 + 2.0*fract(sin(p)*43758.5453123);
}

float noise( in vec2 p )
{
	const float K1 = 0.366025404; // (sqrt(3)-1)/2;
	const float K2 = 0.211324865; // (3-sqrt(3))/6;
	
	vec2 i = floor( p + (p.x+p.y)*K1 );
	
	vec2 a = p - i + (i.x+i.y)*K2;
	vec2 o = (a.x>a.y) ? vec2(1.0,0.0) : vec2(0.0,1.0);
	vec2 b = a - o + K2;
	vec2 c = a - 1.0 + 2.0*K2;
	
	vec3 h = max( 0.5-vec3(dot(a,a), dot(b,b), dot(c,c) ), 0.0 );
	
	vec3 n = h*h*h*h*vec3( dot(a,hash(i+0.0)), dot(b,hash(i+o)), dot(c,hash(i+1.0)));
	
	return dot( n, vec3(70.0) );
}

float fbm(vec2 uv)
{
	float f;
	mat2 m = mat2( 1.6,  1.2, -1.2,  1.6 );
	f  = 0.5000*noise( uv ); uv = m*uv;
	f += 0.2500*noise( uv ); uv = m*uv;
	f += 0.1250*noise( uv ); uv = m*uv;
	f += 0.0625*noise( uv ); uv = m*uv;
	f = 0.5 + 0.5*f;
	return f;
}

#define BLUE_FLAME

void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    // Нормализованные координаты (0.0 до 1.0)
    vec2 uv = fragCoord.xy / iResolution.xy;

    // Соотношение сторон канваса
    float aspect = iResolution.x / iResolution.y;

    // Центрируем UV и корректируем по соотношению сторон
    vec2 q = uv;
    // Учитываем, что канвас теперь только над текстом.
    // Масштабируем по X, чтобы пламя было распределено по ширине текста.
    // Множитель 1.5 и 0.7 - это настройки, чтобы пламя не было слишком толстым или слишком тонким.
    q.x = (q.x - 0.5) * 2.0 * aspect * 1.5; 
    q.y = (q.y - 0.5) * 2.0; // Базовое масштабирование по Y
    
    // Сдвигаем пламя вверх, чтобы его основание было ниже середины канваса.
    // Если канвас 80px, а текст 32px, то нижние 40px канваса будут накладываться на текст.
    // `0.5` привязывает к центру, `0.2` сдвигает вверх.
    q.y += 0.2; // Поднимите это значение, чтобы пламя было выше. Опустите, чтобы было ниже.

    float strength = floor(abs(q.x)*1.5+1.); 
    float T3 = max(3.,1.25*strength)*iTime * 0.7; // Немного замедлил анимацию

    q.x = mod(q.x,1.)-0.5; // Повторяет пламя по X, создавая несколько языков
    
    float n = fbm(strength*q - vec2(0,T3));
    
    float c = 1. - 16. * pow( max( 0., length(q*vec2(1.8+q.y*1.5,.75) ) - n * max( 0., q.y+.25 ) ),1.2 );
    
    // Формула для плавного перехода интенсивности от нижнего края канваса
    // uv.y - 0.1 смещает начало эффекта вверх, 4.0 - резкость затухания
    // float c1 = n * c * (2.0 - pow(1.5 * (uv.y - 0.2), 4.0)); // Старая строка, которую вы использовали.
    
    // Новая формула, которая более контролируемо затухает к верху канваса
    // 1.0 - uv.y делает, что эффект сильнее у нижнего края (uv.y=0) и слабее у верхнего (uv.y=1)
    // pow(..., 2.0) делает затухание более плавным.
    float c1 = n * c * (1.0 - pow(uv.y, 2.0)); 
    c1=clamp(c1,0.,1.);

    vec3 col = vec3(1.5*c1, 1.5*c1*c1*c1, c1*c1*c1*c1*c1*c1);
    
#ifdef BLUE_FLAME
    col = col.zyx; 
#endif
    
    float a = c * (1.-pow(uv.y,3.)); 
    // Увеличиваем альфу для лучшей видимости пламени, особенно в нижней части
    a = smoothstep(0.0, 1.0, a * 1.5); // Усилим альфу и сгладим
    fragColor = vec4( mix(vec3(0.),col,a), a); 
}

void main() {
    mainImage(gl_FragColor, gl_FragCoord.xy);
}
