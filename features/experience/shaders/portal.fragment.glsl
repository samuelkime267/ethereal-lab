uniform float uTime;
uniform sampler2D uNebulaTexture;
uniform sampler2D uSpaceTexture;


varying vec2 vUv;


float PI = 3.141592653589793238;


float hash12(vec2 p) {
	vec3 p3 = fract(p.xyx * 0.1031);
  p3 += dot(p3, p3.yzx + 33.33);
  return fract((p3.x + p3.y) * p3.z);
}

float noise(vec2 p) {
	vec2 i = floor(p);
	vec2 f = fract(p);
	f = f * f * (3.0 - 2.0 * f);
	float res = mix(
		mix(hash12(i), hash12(i + vec2(1, 0)), f.x),
		mix(hash12(i + vec2(0, 1)), hash12(i + vec2(1)), f.x), f.y);
	return res * res;	
}

vec2 twirl(vec2 UV, vec2 Center, float Strength, vec2 Offset) {
    vec2 delta = UV - Center;
    float angle = Strength * length(delta);
    vec2 uv = delta * mat2(cos(angle), -sin(angle), sin(angle), cos(angle));
    return uv + Center + Offset;
}

vec2 hashV(vec2 p) {
    return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
}

float voronoi(vec2 x) {
    vec2 n = floor(x), f = fract(x);
    float distance_type = 1., F1 = 8.0;

    for (int j = -1; j <= 1; j++) {
        for(int i = -1; i <= 1; i++) {
            vec2 g = vec2(i, j);
            vec2 o = hashV(n + g);
            // o = 0.5 + 0.41 * sin(iTime + 6.2831 * o); // animate
            vec2 r = g - f + o;
            float d = distance_type < 1.0 ? dot(r, r)  :          // euclidean^2
                      distance_type < 2.0 ? sqrt(dot(r, r)) :     // euclidean
                      distance_type < 3.0 ? abs(r.x) + abs(r.y) : // manhattan
                      max(abs(r.x), abs(r.y));                    // chebyshev

            if (d < F1) F1 = d;
        }
    }
    return F1;
}


void main(){
  // outer portal twirl
  vec2 centeredUv = ((vUv * 2. - 1.)/2.);
  float fade =  smoothstep(0.,1.,0.08 / distance(vUv, vec2(0.5))) - 0.15;
//   float fadeEdge =  (smoothstep(0.,1.,0.25 / distance(vUv, vec2(0.5))) - 0.5) *5.;
  float fadeEdge =  (smoothstep(0.,1.,0.235 / distance(vUv, vec2(0.5))) - 0.5) *5.;

  vec2 Muv = centeredUv * vec2(5., 5.);
  Muv = twirl(Muv, vec2(0., 0.), 1.95, vec2(-uTime));

  float param = voronoi(Muv);
  param *= smoothstep(0.1, 0.3, length(centeredUv));
  param *= smoothstep(0.95, 0.75, 2. * length(centeredUv));

  // ////////////////////////////////////
  // inner portal twirl

  vec2 twirledUv = twirl(vUv, vec2(0.5), sin(uTime) * 10. + 50., vec2(0.));

  float l = sqrt(length(twirledUv));
  float a = l * 9.0 - uTime;

  vec2 newUv = cos(-twirledUv.x + a) * twirledUv + sin(a) * vec2(-twirledUv.y, twirledUv.x);

  float b = noise(35.185 - newUv * 50.0);

  vec3 c1 = cos(vec3(1.) * 8.0 - b) * 0.5 + 0.5;

  vec3 nDist = vec3(b);
  vec3 noDist = vec3(param);

  vec4 nebularImg = texture2D(uNebulaTexture, vUv * c1.xy * 1.5);
  vec4 SpaceImg = texture2D(uSpaceTexture, vUv * noDist.xy);

  vec4 finalImg = mix(SpaceImg, nebularImg, fade);


  gl_FragColor = vec4(finalImg.xyz,fadeEdge);
//   gl_FragColor = vec4(vec3(fadeEdge),1.);
}