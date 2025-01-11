uniform sampler2D uTexture;
uniform vec3 uColor;

varying float vTwinkle;


void main(){
  vec4 starImg = texture2D(uTexture, gl_PointCoord);
  vec3 finalColor = mix(starImg.rgb, uColor, vec3(vTwinkle));

  gl_FragColor = vec4(finalColor ,starImg.a);
}