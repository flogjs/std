/*
 * Flog JavaScript Runtime, Standard Library
 *
 * Copyright (c) Terrablue <terrablue@proton.me> and contributors.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
#include "glue.h"

char* console_strings_glue(int num_args, ...) {
  size_t lengths[num_args];
  va_list args;

  va_start(args, num_args);
  size_t total = 0;
  for (size_t i = 0; i < num_args; i++) {
    lengths[i] = flog_string_length(va_arg(args, char*));
    total += lengths[i];
  }
  va_end(args);

  char* buffer = (char*)malloc(sizeof(char) * total + 1);
  buffer[total] = 0;

  va_start(args, num_args);
  size_t cumulative_length = 0;
  for (size_t i = 0; i < num_args; i++) {
    char* string = va_arg(args, char*);
    for (size_t j = 0; j < lengths[i]; j++) {
      buffer[cumulative_length + j] = string[j];
    }
    cumulative_length += lengths[i];
  }
  va_end(args);

  return buffer;
}
