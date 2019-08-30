#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

 const vec3 orange = vec3(0.91, 0.68, 0.41);
 const vec3 light_yellow = vec3(0.91, 0.89, 0.41);

float random (vec2 st) {
    return fract(sin(dot(st.xy,
                         vec2(12.9898,78.233)))
                 * 43758.5453123);
}

vec3 sand(float ratio)
{
    return mix(orange, light_yellow, ratio);
}

void main()
{
    // Normalized pixel coordinates (from 0 to 1)
    vec2 uv = gl_FragCoord.xy/u_resolution.xy;
    
    float number = u_resolution.x / 1000.0;

    float rand = random(uv);
    vec3 col = sand(rand); //sand
    
    float speed =  mod(u_time, 10.0) / 10.0;
    float x_offset =  5.0;
    float wave_amplitude = 0.5 * 0.5 * sin(3.14 * speed);
    float y_offset = -0.3 + sin(3.14 * speed);
    
    
    float peak = 1.0/rand + 0.5 + random(vec2(uv.x, uv.x));
    float yy = 0.2 * (1.0 + wave_amplitude * peak * cos(x_offset + 3.0 * 3.14 * uv.x ));
    if(uv.y > yy + y_offset)
    {
        col.x = 0.8*(uv.y - yy - y_offset)/(1.0 - yy - y_offset) + 0.1 * rand;
        col.y = 0.46;
        col.z = 0.85 + wave_amplitude + random(uv);
    }
    else if(uv.y > yy + sin(y_offset * rand + 1.0 / u_time))
    {
        col.x = 0.7*(uv.y - yy - y_offset)/(1.0 - yy - y_offset) + rand;
        col.y = 0.1 + rand;
        col.z = 0.75 + wave_amplitude + random(uv);
    }
   
    // Output to screen
    gl_FragColor = vec4(col, 1.0);
}