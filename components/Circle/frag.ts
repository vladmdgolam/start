// Fragment shader with inlined glsl-noise and glsl-blend functions
const frag = /* glsl */ `
    uniform float time;
    varying vec2 vUv;
    uniform vec3 pink;
    uniform vec3 blue;
    uniform float blur;
    uniform vec2 position;
    uniform float radius;
    uniform float seed;
    #define PI 3.1415926535897932384626433832795

    // glsl-blend/difference
    vec3 blendDifference(vec3 base, vec3 blend) {
        return abs(base - blend);
    }

    // glsl-noise/simplex/2d (Ashima Arts simplex noise)
    vec3 mod289(vec3 x) {
        return x - floor(x * (1.0 / 289.0)) * 289.0;
    }

    vec2 mod289(vec2 x) {
        return x - floor(x * (1.0 / 289.0)) * 289.0;
    }

    vec3 permute(vec3 x) {
        return mod289(((x * 34.0) + 1.0) * x);
    }

    float snoise2(vec2 v) {
        const vec4 C = vec4(0.211324865405187,
                           0.366025403784439,
                          -0.577350269189626,
                           0.024390243902439);
        vec2 i  = floor(v + dot(v, C.yy));
        vec2 x0 = v -   i + dot(i, C.xx);
        vec2 i1;
        i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
        vec4 x12 = x0.xyxy + C.xxzz;
        x12.xy -= i1;
        i = mod289(i);
        vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0))
            + i.x + vec3(0.0, i1.x, 1.0));
        vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
        m = m * m;
        m = m * m;
        vec3 x = 2.0 * fract(p * C.www) - 1.0;
        vec3 h = abs(x) - 0.5;
        vec3 ox = floor(x + 0.5);
        vec3 a0 = x - ox;
        m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
        vec3 g;
        g.x  = a0.x  * x0.x  + h.x  * x0.y;
        g.yz = a0.yz * x12.xz + h.yz * x12.yw;
        return 130.0 * dot(m, g);
    }

    float circle(vec2 uv, vec2 pos, float r, float blur) {
        float d = length(uv-pos);
        float result = smoothstep(r, r-blur, d);
        return result;
    }

    float map(float value, float min1, float max1, float min2, float max2) {
        return min2 + (value - min1) * (max2 - min2) / (max1 - min1);
    }

    float rand(vec2 co){
        return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);
    }

    vec4 grain(vec4 col, float scale, float amount) {
        vec2 args = vec2(gl_FragCoord.xy*scale + rand(gl_FragCoord.xy + time)*10.0);
        float noiseValue = snoise2(args);
        vec3 noise = vec3(noiseValue);
        vec3 grainColor = mix(vec3(0.0), vec3(1.0), noise * amount);
        return vec4(mix(col.rgb, grainColor, amount), col.a);
    }

    void main() {
        vec2 uv = vUv;
        uv -= .5;

        float r = 0.5 * 0.8;

        // 1. PINK CIRCLE
        float angle = rand(vec2(seed+1.0)) * 2.0 * PI;
        float speed = time * 0.3;
        vec2 pos = vec2(0.19 * cos(angle + speed), 0.19 * sin(angle+speed));
        vec3 pinkCircle = circle(uv, pos, r * 0.7, 0.2) * pink ;
        vec3 col = pinkCircle;


        // 2. WHITE CIRCLE
        float noiseScale2 = 10.5;
        float noise2 = snoise2(vec2(noiseScale2 + time * 0.1));
        float noiseRad = map(noise2, 0.0, 1.0, 0.8, 0.9);

        float sAngle = rand(vec2(seed, seed * 23.7)) * 2.0 * PI;
        pos = vec2(cos(sAngle + time*0.6), sin(sAngle + time*0.6)) * 0.15;
        float whiteCircle = circle(uv, pos, r*noiseRad, 0.2);
        col += whiteCircle * vec3(1.);

        // 3. BLUE CIRCLE
        float blueCircleRad = map(sin(time), -1.0, 1.0, 0.95, 1.0);

        float blueCircle = circle(uv, position, r*blueCircleRad, 0.2);
        vec3 blueCircleFilled = blueCircle * blue;

        col = blendDifference(col, blueCircleFilled);

        // 4. PINK BACKDROP
        float pinkBackdrop = circle(uv, vec2(0.,0.), r*1.1, 0.05) * 0.1;
        col += pinkBackdrop * pink;

        // 4.5 map transparency
        float alpha = smoothstep(0.0, 1.0, length(col));

        // 5. BLACK CIRCLE
        col = clamp(col, 0., 1.);
        float black = circle(uv, vec2(0.,0.), r, 0.1);
        col -= vec3(black)*2.0;

        alpha += black*2.0;

        // 6. GRAIN
        col = grain(vec4(col,1.), 1.4, 0.25).rgb;

        gl_FragColor = vec4(col, alpha);
    }
`

export default frag
