uniform sampler2D uTexture;
uniform float uTime;
varying vec2 vUv;

void main() {
  vec2 pos = vUv;
  float r = abs(sin( pos.x + uTime));
  float g = abs(cos( pos.y + uTime));
  float b = abs(sin( pos.x - uTime));
  float alpha = texture2D(uTexture, pos).a;
  if (alpha < .01) discard;
  gl_FragColor = vec4(r, g, b, alpha);
}