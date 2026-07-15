import { Component, inject } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { PlayerService } from '../../core/services/player.service';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  template: `
    <section class="page-shell">
      <form class="panel form" [formGroup]="form" (ngSubmit)="submit()" novalidate>
        <h1>Registro del corredor</h1>
        <p>Estos datos se usan solo para personalizar la experiencia educativa en este dispositivo.</p>

        <label>
          Nombre
          <input formControlName="name" autocomplete="given-name" />
        </label>
        @if (form.controls.name.touched && form.controls.name.invalid) {
          <small>Escribe un nombre de al menos 2 caracteres.</small>
        }

        <label>
          Edad
          <input formControlName="age" type="number" min="7" max="17" />
        </label>
        @if (form.controls.age.touched && form.controls.age.invalid) {
          <small>La edad debe estar entre 7 y 17 años.</small>
        }

        <label>
          Sexo
          <select formControlName="sex">
            <option value="">Selecciona una opción</option>
            <option value="masculino">Masculino</option>
            <option value="femenino">Femenino</option>
            <option value="prefiero-no-decirlo">Prefiero no decirlo</option>
          </select>
        </label>
        @if (form.controls.sex.touched && form.controls.sex.invalid) {
          <small>Selecciona una opción.</small>
        }

        <div class="button-row">
          <button class="btn btn-primary" type="submit">Continuar</button>
          <a class="btn btn-ghost" routerLink="/inicio">Volver</a>
        </div>
      </form>
    </section>
  `,
  styles: [
    `
      .form {
        display: grid;
        gap: 16px;
        margin: 0 auto;
        max-width: 640px;
      }

      label {
        display: grid;
        font-weight: 800;
        gap: 8px;
      }

      input,
      select {
        border: 2px solid rgb(3 105 161 / 22%);
        border-radius: 8px;
        min-height: 48px;
        padding: 10px 12px;
      }

      small {
        color: #b91c1c;
        font-weight: 700;
      }
    `,
  ],
})
export class RegistrationComponent {
  private readonly formBuilder = inject(NonNullableFormBuilder);
  private readonly playerService = inject(PlayerService);
  private readonly router = inject(Router);

  readonly form = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    age: [7, [Validators.required, Validators.min(7), Validators.max(17)]],
    sex: ['', [Validators.required]],
  });

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const value = this.form.getRawValue();
    this.playerService.savePlayer({
      name: value.name.trim(),
      age: value.age,
      sex: value.sex as 'masculino' | 'femenino' | 'prefiero-no-decirlo',
      createdAt: new Date().toISOString(),
    });
    void this.router.navigateByUrl('/introduccion');
  }
}
