# fitness-tracker-48

A fitness tracker app originating from a project to build something new in 48 hours. Calculates calories and macros. Logs personal records and workouts.

## Background

After struggling with slow progress on a long project, I decided one Friday afternoon to design, build, and ship something new in just 48 hours. By Sunday night, I had completed a mobile fitness app that calculated diet goals and tracked personal exercise records. I took another two weekends to add workout logging, visual polish, and better input validation. This repo captures the complete software development lifecycle of a simple but useful app delivered quickly.

## Requirements Specification

### User Stories

| As a ... | I want to ... | so that I can ... |
|---|---|---|
| user | enter physiological data and goals | generate macro and calorie recommendations. |
| user | view macro and calorie recommendations | review the information. |
| user | view PRs | review the information. |
| user | add a PR | input new information. |
| user | edit a PR | modify the information. |
| user | delete a PR | remove the information. |
| user | view workouts | select a workout. |
| user | add a workout | input new information. |
| user | delete a workout | remove the information. |
| user | view a workout | review the information or add exercises. |
| user | add an exercise | input new information. |
| user | delete an exercise | remove the information. |

## Architecture Specification

### Component Diagram

![A component diagram](./documentation/component-diagram.jpeg)

### ER Diagram

![An ER diagram](./documentation/er-diagram.jpeg)

### App Data and Database Schema

![The app data and database schema](./documentation/app-data-and-db-schema.jpeg)

## Tools and Technologies

- Expo
- JavaScript
- React Native
- Async Storage
- Expo SQLite
- Expo Font

## Dependencies

- React
- React Native
- Async Storage
- Expo SQLite
- Expo Font
- @expo-google-fonts/poppins

## Lessons Learned

### Validation Isn't Easy

I tackled validation last instead of baking it into the design. That was a mistake. Particularly on the frontend, validation can present more challenges than might be expected. In this case, I was forced to confront my earlier assumptions about what exactly certain state variables represented. For example, should the variable storing the amount of weight used for an exercise be a Number, because that's what it is in the database, or a String, because that's what it has to be when it displays on the page? Should JavaScript's dynamic typing permit it to be either a Number or a String (or null) as needed, or should separate variables be used, one to cache the database value and another to update the UI? If two variables are used, when should changing one result in an update to the other? Adding proper input validation required me to tighten up my understanding of the data underlying my UI and carefully review how it was being pulled, passed, and updated on almost every page.

### UI Doesn't Have to Be Hard

Pick three colors. Pick a font. Design three headings. Design an improved Button. Design a labeled TextInput. Learn flexbox and control layout with a simple set of Views. Centralize global styles, and localize component styles. You now have the tools to build new tools, bring functionality to the user, and iterate end-to-end. It doesn't have to be a work of art to give quick expression to what you're doing on the backend.

### The Map Is Not the Terrain

I remind myself of this on every project.

Jot down user stories. Draw up architecture. Never fail to plan, and think everything through. But then, *get coding.* You will encounter complications during development that you did not consider during planning. That component diagram will need to be redrawn. That database schema will need to be modified. New user stories will present themselves, and low-value user stories will need to be eliminated. You cannot set out without a good map, but you cannot draw the best map until the journey is complete.

### General Improvements

#### Async Storage and SQLite

- Improved familiarity with offline-first mobile development, with all data persisted on the device, either in key-value pairs (Async Storage) or in a relational database file (SQLite).

#### React Native

- Improved familiarity with custom components, stylesheets, props, state, effects, and handlers.
- Improved familiarity with component mounting, component re-rendering, and events in relation to state and local variables.
- Improved familiarity with asynchronous state updates and batching of state updates.
- Improved familiarity with flexbox size and positioning behaviors.

## Possibilities for Future Development

- Reusable workout templates
- Reusable exercise templates
- Automatic personal record tracking
- Deeper personal record, workout, and exercise details
- Web-based backend with authentication and cross-device functionality
- Improved visuals
- More convenient error handling

## Scrum

### Product Backlog

| To Do | Doing | Done |
|---|---|---|
|  | Documentation | Setup |
|  |  | Requirements Specification |
|  |  | Architecture Specification |
|  |  | Macros and Calories |
|  |  | PRs |
|  |  | Workouts |
|  |  | Exercises |
|  |  | Polish |
|  |  | Validation |
|  |  | Fonts |

### Sprint 7: Validation, Fonts, and Documentation

#### Velocity: 

#### Backlog

| Feature | Points |
|---|---|
| Validation | 8 |
| Fonts | 3 |
| Update Descriptions | 2 |
| Update Architecture | 5 |
| Lessons Learned | 5 |
| Possibilities for Future Development | 3 |
| Demo | 8 |

| To Do | Doing | Done |
|---|---|---|
|  | Update Architecture | Validation |
|  | Demo | Fonts |
|  |  | Update Descriptions |
|  |  | Lessons Learned |
|  |  | Possibilities for Future Development |

### Sprint 6: Polish

#### Velocity: 37

#### Backlog

| Feature | Points |
|---|---|
| Trim Input/Output Scope | 5 |
| Clarify Naming | 5 |
| Type Scale Choices | 3 |
| Color Choices | 3 |
| Centralize Generic Styles | 5 |
| Title Component | 2 |
| FitnessTrackerButton Component | 3 |
| OutputLineItem Component | 3 |
| Apply New Visuals to Pages | 8 |

| To Do | Doing | Done |
|---|---|---|
|  |  | Trim Input/Output Scope |
|  |  | Clarify Naming |
|  |  | Type Scale Choices |
|  |  | Color Choices |
|  |  | Centralize Generic Styles |
|  |  | Title Component |
|  |  | FitnessTrackerButton Component |
|  |  | OutputLineItem Component |
|  |  | Apply New Visuals to Pages |

### Sprint 5: Exercises

#### Velocity: 18

#### Backlog

| Feature | Points |
|---|---|
| Database Setup | 2 |
| Expo SQLite Logic | 2 |
| Pages | 2 |
| Components | 2 |
| State and Hooks | 5 |
| Testing | 5 |

| To Do | Doing | Done |
|---|---|---|
|  |  | Database Setup |
|  |  | Expo SQLite Logic |
|  |  | Pages |
|  |  | Components |
|  |  | State and Hooks |
|  |  | Testing |

### Sprint 4: Workouts

#### Velocity: 20

#### Backlog

| Feature | Points |
|---|---|
| Database Setup | 2 |
| Expo SQLite Logic | 3 |
| Pages | 3 |
| Components | 2 |
| State and Hooks | 5 |
| Testing | 5 |

| To Do | Doing | Done |
|---|---|---|
|  |  | Database Setup |
|  |  | Expo SQLite Logic |
|  |  | Pages |
|  |  | Components |
|  |  | State and Hooks |
|  |  | Testing |

### Sprint 3: PRs

#### Velocity: 21

#### Backlog

| Feature | Points |
|---|---|
| Database Setup | 3 |
| Expo SQLite Logic | 3 |
| Pages | 3 |
| Components | 2 |
| State and Hooks | 5 |
| Testing | 5 |

| To Do | Doing | Done |
|---|---|---|
|  |  | Pages |
|  |  | Components |
|  |  | Database Setup |
|  |  | Expo SQLite Logic |
|  |  | State and Hooks |
|  |  | Testing |

### Sprint 2: Macros and Calories

#### Velocity: 26

#### Backlog

| Feature | Points |
|---|---|
| Formula Logic | 3 |
| Async Storage Logic | 5 |
| Pages | 2 |
| Components | 3 |
| Navigation Logic | 3 |
| State and Hooks | 5 |
| Testing | 5 |

| To Do | Doing | Done |
|---|---|---|
|  |  | Formula Logic |
|  |  | Async Storage Logic |
|  |  | Pages |
|  |  | Components |
|  |  | Navigation Logic |
|  |  | State and Hooks |
|  |  | Testing |

### Sprint 1: Setup, Requirements Specification, and Architecture Specification

#### Velocity: 25

#### Backlog

| Feature | Points |
|---|---|
| Set up GitHub | 2 |
| Set up Scrum | 3 |
| Set up Expo Project | 2 |
| User Stories | 5 |
| Component Diagram | 5 |
| ER Diagram | 5 |
| Database Schema | 3 |

| To Do | Doing | Done |
|---|---|---|
|  |  | Set up GitHub |
|  |  | Set up Scrum |
|  |  | Set up Expo Project |
|  |  | User Stories |
|  |  | Component Diagram |
|  |  | ER Diagram |
|  |  | Database Schema |
