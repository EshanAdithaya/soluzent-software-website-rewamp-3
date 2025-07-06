'use client';

import { useEffect, useRef } from 'react';

const ShaderBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl2');
    if (!gl) return;

    // Vertex shader source
    const vertexShaderSource = `#version 300 es
      precision highp float;
      in vec4 position;
      void main() {
        gl_Position = position;
      }
    `;

    // Fragment shader source (simplified version of the original)
    const fragmentShaderSource = `#version 300 es
      precision highp float;
      out vec4 O;
      uniform float time;
      uniform vec2 resolution;
      
      #define FC gl_FragCoord.xy
      #define R resolution
      #define T time
      #define N normalize
      #define S smoothstep
      #define MN min(R.x,R.y)
      #define rot(a) mat2(cos((a)-vec4(0,11,33,0)))
      #define csqr(a) vec2(a.x*a.x-a.y*a.y,2.*a.x*a.y)
      
      float rnd(vec3 p) {
        p=fract(p*vec3(12.9898,78.233,156.34));
        p+=dot(p,p+34.56);
        return fract(p.x*p.y*p.z);
      }
      
      float swirls(in vec3 p) {
        float d=.0;
        vec3 c=p;
        for(float i=min(.0,time); i<9.; i++) {
          p=.7*abs(p)/dot(p,p)-.7;
          p.yz=csqr(p.yz);
          p=p.zxy;
          d+=exp(-19.*abs(dot(p,c)));
        }
        return d;
      }
      
      vec3 march(in vec3 p, vec3 rd) {
        float d=.2, t=.0, c=.0, k=mix(.9,1.,rnd(rd)),
        maxd=length(p)-1.;
        vec3 col=vec3(0);
        for(float i=min(.0,time); i<60.; i++) {
          t+=d*exp(-2.*c)*k;
          c=swirls(p+rd*t);
          if (t<5e-2 || t>maxd) break;
          col+=vec3(c*c,c/1.05,c)*8e-3;
        }
        return col;
      }
      
      float rnd(vec2 p) {
        p=fract(p*vec2(12.9898,78.233));
        p+=dot(p,p+34.56);
        return fract(p.x*p.y);
      }
      
      vec3 sky(vec2 p, bool anim) {
        p.x-=.17-(anim?2e-4*T:.0);
        p*=500.;
        vec2 id=floor(p), gv=fract(p)-.5;
        float n=rnd(id), d=length(gv);
        if (n<.975) return vec3(0);
        return vec3(S(3e-2*n,1e-3*n,d*d));
      }
      
      void cam(inout vec3 p) {
        p.yz*=rot(-T*.05);
        p.xz*=rot(T*.025);
      }
      
      void main() {
        vec2 uv=(FC-.5*R)/MN;
        vec3 col=vec3(0),
        p=vec3(0,0,-16),
        rd=N(vec3(uv,1)), rdd=rd;
        cam(p); cam(rd);
        col=march(p,rd);
        col=S(-.2,.9,col);
        vec2 sn=.5+vec2(atan(rdd.x,rdd.z),atan(length(rdd.xz),rdd.y))/6.28318;
        col=max(col,vec3(sky(sn,true)+sky(2.+sn*2.,true)));
        float t=min((time-.5)*.3,1.);
        uv=FC/R*2.-1.;
        uv*=.7;
        float v=pow(dot(uv,uv),1.8);
        col=mix(col,vec3(0),v);
        col=mix(vec3(0),col,t);
        col=max(col,.01);
        O=vec4(col,1);
      }
    `;

    const vertices = [-1, 1, -1, -1, 1, 1, 1, -1];

    function createShader(type: number, source: string) {
      const shader = gl.createShader(type);
      if (!shader) return null;
      
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error('Shader compilation error:', gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      
      return shader;
    }

    function createProgram(vertexShader: WebGLShader, fragmentShader: WebGLShader) {
      const program = gl.createProgram();
      if (!program) return null;
      
      gl.attachShader(program, vertexShader);
      gl.attachShader(program, fragmentShader);
      gl.linkProgram(program);
      
      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.error('Program linking error:', gl.getProgramInfoLog(program));
        gl.deleteProgram(program);
        return null;
      }
      
      return program;
    }

    const vertexShader = createShader(gl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = createShader(gl.FRAGMENT_SHADER, fragmentShaderSource);
    
    if (!vertexShader || !fragmentShader) return;
    
    const program = createProgram(vertexShader, fragmentShader);
    if (!program) return;

    // Setup buffer
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

    const position = gl.getAttribLocation(program, 'position');
    gl.enableVertexAttribArray(position);
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

    const timeLocation = gl.getUniformLocation(program, 'time');
    const resolutionLocation = gl.getUniformLocation(program, 'resolution');

    function resize() {
      const displayWidth = canvas.clientWidth;
      const displayHeight = canvas.clientHeight;

      if (canvas.width !== displayWidth || canvas.height !== displayHeight) {
        canvas.width = displayWidth;
        canvas.height = displayHeight;
        gl.viewport(0, 0, canvas.width, canvas.height);
      }
    }

    function render(time: number) {
      resize();
      
      gl.clearColor(0, 0, 0, 1);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.useProgram(program);
      
      gl.uniform1f(timeLocation, time * 0.001);
      gl.uniform2f(resolutionLocation, canvas.width, canvas.height);
      
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      
      animationRef.current = requestAnimationFrame(render);
    }

    resize();
    animationRef.current = requestAnimationFrame(render);

    const handleResize = () => resize();
    window.addEventListener('resize', handleResize);

    return () => {
      if (animationRef.current !== undefined) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener('resize', handleResize);
      
      if (program) {
        gl.deleteProgram(program);
      }
      if (vertexShader) {
        gl.deleteShader(vertexShader);
      }
      if (fragmentShader) {
        gl.deleteShader(fragmentShader);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full -z-10 opacity-30"
      style={{
        pointerEvents: 'none',
        background: 'linear-gradient(135deg, #000000 0%, #111111 100%)',
      }}
    />
  );
};

export default ShaderBackground;