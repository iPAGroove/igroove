// flame.frag (сохрани этот файл)
precision highp float;
uniform vec2 resolution;
uniform float time;

// Более сложная функция шума (пример FBM для лучшего пламени)
// Можешь найти готовые реализации на Shadertoy
float hash(float n) { return fract(sin(n) * 43758.5453123); }

float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f*f*(3.0-2.0*f);
    return mix(mix(hash(i.x + hash(i.y)),
                   hash(i.x + 1.0 + hash(i.y)), u.x),
               mix(hash(i.x + hash(i.y + 1.0)),
                   hash(i.x + 1.0 + hash(i.y + 1.0)), u.x), u.y);
}

float fbm(vec2 p) {
    float f = 0.0;
    f += 0.5000 * noise(p); p *= 2.0;
    f += 0.2500 * noise(p); p *= 2.0;
    f += 0.1250 * noise(p); p *= 2.0;
    f += 0.0625 * noise(p); p *= 2.0;
    return f;
}

void main() {
    vec2 uv = gl_FragCoord.xy / resolution.xy;

    // Анимация пламени вверх
    float fire_y_speed = 0.15; // Скорость движения пламени вверх
    uv.y -= time * fire_y_speed;

    // Создаем базовый шум для пламени
    float fire_noise = fbm(uv * 3.0 + vec2(0.0, time * 0.2)); 

    // Дополнительный слой шума для деталей
    fire_noise += fbm(uv * 7.0 + vec2(time * 0.1, time * 0.3)) * 0.5;

    // Деформируем шум для языков пламени
    float distort_x = noise(uv * 2.0 + time * 0.1) * 0.2 - 0.1;
    float distort_y = noise(uv * 4.0 + time * 0.2) * 0.1 - 0.05;
    fire_noise = fbm((uv + vec2(distort_x, distort_y)) * 4.0 + time * 0.1);

    // Создаем форму пламени, чтобы оно было выше
    float flame_shape = pow(1.0 - uv.y, 2.0) * 4.0; // Сильное уменьшение кверху
    fire_noise *= flame_shape;

    // Ограничиваем интенсивность
    fire_noise = max(0.0, fire_noise - 0.1); // Сдвиг, чтобы было больше темноты
    fire_noise = smoothstep(0.0, 1.0, fire_noise); // Плавный переход

    // Голубая цветовая палитра для пламени
    vec3 color = vec3(0.0);
    if (fire_noise > 0.8) {
        color = mix(vec3(0.9, 0.95, 1.0), vec3(0.7, 0.85, 1.0), (fire_noise - 0.8) / 0.2); // Ярко-белый/светло-голубой
    } else if (fire_noise > 0.5) {
        color = mix(vec3(0.2, 0.5, 0.9), vec3(0.9, 0.95, 1.0), (fire_noise - 0.5) / 0.3); // Средний голубой
    } else if (fire_noise > 0.2) {
        color = mix(vec3(0.0, 0.1, 0.5), vec3(0.2, 0.5, 0.9), (fire_noise - 0.2) / 0.3); // Темный синий
    } else {
        color = vec3(0.0, 0.0, 0.1) * fire_noise / 0.2; // Почти черный для самого низа
    }

    // Обрезаем пламя снизу, чтобы не выходило за буквы
    float cut_off = smoothstep(0.0, 0.1, uv.y); // Постепенно проявляется от низа
    color *= cut_off;

    gl_FragColor = vec4(color, fire_noise * (1.0 - uv.y)); // Alpha зависит от интенсивности и высоты
}
