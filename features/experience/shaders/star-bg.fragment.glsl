uniform sampler2D uTexture;
uniform vec3 uColor;

varying float vTwinkle;
varying vec3 vColor;


void main(){
  vec4 starImg = texture2D(uTexture, gl_PointCoord);
  vec3 finalColor = mix(starImg.rgb, uColor, vec3(vTwinkle));

  gl_FragColor = vec4(finalColor ,starImg.a);
  gl_FragColor = vec4(vColor, starImg.a);
  // gl_FragColor = vec4(vColor, 1.);
}