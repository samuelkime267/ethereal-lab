uniform float uSize;
uniform float uTime;

varying vec2 vUv;
varying float vTwinkle;

attribute float aTwinkle;
attribute float aTwinkleSpeed;


float PI = 3.141592653589793238;


void main() {
  vUv = uv;

  float twinkleScale = uSize * aTwinkle * clamp(sin(uTime * aTwinkleSpeed), 0.1, 1.);

  vTwinkle = twinkleScale / uSize;

  vec4 mvPosition = modelViewMatrix * vec4( position, 1. );
  gl_PointSize = (uSize + twinkleScale) * ( 1. / - mvPosition.z );
  gl_Position = projectionMatrix * mvPosition;
}