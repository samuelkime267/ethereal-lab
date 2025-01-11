uniform sampler2D uTexture;
uniform vec3 uColor;


void main(){
  vec4 starImg = texture2D(uTexture, gl_PointCoord);
  vec3 finalColor = mix(uColor, starImg.rgb, vec3(0.));
  // gl_FragColor = starImg;

  gl_FragColor = vec4(finalColor ,starImg.a);
  // gl_FragColor = vec4(gl_PointCoord ,0. ,1.);
}