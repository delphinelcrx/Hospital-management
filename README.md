# HospitalManagement - Application

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.2.6.

## App login

Use these credentials to log in to the application.

Email : admin@mail.com
Password : password

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

# Traduction

Pour implémenter un système de traduction dans mon projet j'ai préféré utiliser "Transloco", une bibliothèque de gestion des traductions pour les applications Angular.

### Avantages de Transloco :

- **Chargement des traductions de manière asynchrone** : seules les traductions nécessaires sont chargées ce qui allège la quantité de données à charger et rend l'expérience utilisateur plus fuilde.
- **Fichiers de traductions séparés du code** : les traductions sont présentes dans des fichiers JSON à part ce qui rend leur gestion plus simples.
- **Utilisation des clés de traduction** : au lieu d'avoir un chaîne de caractère directement dans la template.
- **Communauté active** : il est facile de trouver de l'aide lorsqu'on rencontre un problème et cette bibliothèque possède une documentation bien faite.

Globalement, je trouve que Transloco est plus performant et plus simple d'utilisation que d'autres outils pour mettre en place une traduction.

### Fonctionnement de Transloco :

Installer la bibliothèque : `ng add @ngneat/transloco` puis définir les langues prises en charge.

Ajouter des clés de traductions dans ma template :

```html
<ng-container *transloco="let t">
  <p>{{ t('title') }}</p>
</ng-container>
```

Et définir les traductions dans les fichiers .json :

```json
{
  "name": "My name is {{name}}"
}
```

### Points de blocage rencontrés :

- Traduire des valeurs enregistrées en bdd, par exemple : le département d'un médecin dans le tableau qui affiche les médecins.

- Traduire un élément intégré à angular material : le "item per page" en bas du tableau

Pour ces 2 cas j'ai essayé des choses mais sans succès.
