#include <stdio.h>
#include <stdlib.h>
#include <GL/glut.h>

#include <emscripten.h>
#include <emscripten/html5.h>

#include "util.h"

#define WIDTH 1024
#define HEIGHT 768

#define NUM_FLAKES 50000
#define FLAKE_SIZE 2
#define FLAKE_SPEED 0.04f
#define SNOWINESS 0.998f

struct Flake { float x, y, vx, vy; };

static struct Flake flakes[NUM_FLAKES] = {};

void on_mouse_up(int button, int state, int mouse_x, int mouse_y)
{
    int x = mouse_x;
    // Convert from canvas coordinates where 0 is at the top
    // to OpenGL where 0 is at the bottom.
    int y = HEIGHT - mouse_y;
    if (button == GLUT_LEFT_BUTTON && state == GLUT_UP)
    {
        printf("on_mouse_up: x=%d, y=%d\n", x, y);
        for (int i = 0; i < NUM_FLAKES; ++i) {
          float dx = x - flakes[i].x;
          float dy = y - flakes[i].y;
          float distSquared = dx * dx + dy * dy;
          flakes[i].vx = dx * 5 / (distSquared + 0.1f);
          flakes[i].vy = -dy * 5 / (distSquared + 0.1f);
        }
    }
}

// Per-frame animation tick
EM_BOOL draw_frame(double t, void *userData)
{
  static double prevT;
  double dt = t - prevT;
  prevT = t;

  clear_screen(0.1f, 0.2f, 0.3f, 1.f);

  for (int i = 0; i < NUM_FLAKES; ++i) {
    flakes[i].y -= dt * flakes[i].vy;
    flakes[i].x += dt * flakes[i].vx;
    // Vary the brightness of the flakes a bit
    float brightness = 0.5f + i * 0.5f / NUM_FLAKES;
    if (flakes[i].y > 0) {
      fill_solid_rectangle(
        flakes[i].x,
        flakes[i].y,
        flakes[i].x + FLAKE_SIZE,
        flakes[i].y + FLAKE_SIZE,
        brightness, brightness, brightness,
        1.f);
    }
    else if (emscripten_random() > SNOWINESS) {
      // Move the flake back to the top
      flakes[i].x = WIDTH * emscripten_random();
      flakes[i].y = HEIGHT;
      flakes[i].vx = (emscripten_random() - 0.5f) * 0.02f;
      flakes[i].vy = FLAKE_SPEED + i * 0.05f / NUM_FLAKES;
    }
  }

  return EM_TRUE;
}

int main(int argc, char *argv[])
{
  init_webgl(WIDTH, HEIGHT);
  glutInit(&argc, argv);
  glutMouseFunc(&on_mouse_up);
  emscripten_request_animation_frame_loop(&draw_frame, 0);
}
