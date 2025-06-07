# Live Football World Cup Scoreboard

A TypeScript library for managing live football world cup scoreboard matches and their scores.

## Features

- Start new matches
- Update match scores
- Finish ongoing matches
- Get summary of matches ordered by total score

## Installation

```bash
npm install live-footbal-worldcup-scoreboard
```

## Usage

```typescript
import { Scoreboard } from 'live-footbal-worldcup-scoreboard';

const scoreboard = new Scoreboard();

// Start a new match
scoreboard.startMatch('Mexico', 'Canada');

// Update score
scoreboard.updateScore('Mexico', 'Canada', 0, 5);

// Get summary of matches
const summary = scoreboard.getSummary();

// Finish a match
scoreboard.finishMatch('Mexico', 'Canada');
```

## Development

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run tests:
   ```bash
   npm test
   ```
4. Build the project:
   ```bash
   npm run build
   ```

## Scripts

- `npm run build` - Build the TypeScript code
- `npm test` - Run tests
- `npm run test:watch` - Run tests in watch mode
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues
- `npm run format` - Format code with Prettier

## License

ISC 