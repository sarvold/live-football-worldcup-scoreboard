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

### Error Handling

The library includes comprehensive error handling for common scenarios:

```typescript
try {
  // Cannot start a match with the same team twice
  scoreboard.startMatch('Mexico', 'Mexico');
} catch (error) {
  console.error(error.message); // "Match already exists"
}

try {
  // Cannot start a match with a team already in another match
  scoreboard.startMatch('Mexico', 'Canada');
  scoreboard.startMatch('Mexico', 'Brazil');
} catch (error) {
  console.error(error.message); // "Team Mexico is already in a match"
}

try {
  // Cannot update score with negative values
  scoreboard.updateScore('Mexico', 'Canada', -1, 0);
} catch (error) {
  console.error(error.message); // "Scores cannot be negative"
}
```

### Summary Sorting

The `getSummary()` method returns matches ordered by:
1. Total score (descending) - matches with higher total scores appear first
2. Start time (most recent first) - when total scores are equal, more recently started matches appear first

Example:
```typescript
// Start matches in order
scoreboard.startMatch('Mexico', 'Canada');
scoreboard.startMatch('Spain', 'Brazil');
scoreboard.startMatch('Germany', 'France');

// Update scores
scoreboard.updateScore('Mexico', 'Canada', 0, 5);
scoreboard.updateScore('Spain', 'Brazil', 10, 2);
scoreboard.updateScore('Germany', 'France', 2, 2);

const summary = scoreboard.getSummary();
// Returns matches in order:
// 1. Spain 10 - Brazil 2 (total: 12)
// 2. Mexico 0 - Canada 5 (total: 5)
// 3. Germany 2 - France 2 (total: 4)
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

## Design Decisions

- **In-Memory Storage**: The library uses an in-memory Map to store matches, making it lightweight and fast.
- **Type Safety**: Full TypeScript support with strict type checking enabled.
- **Error Handling**: Comprehensive error handling for invalid operations.
- **Team Uniqueness**: Teams can only participate in one match at a time.
- **Score Validation**: Scores cannot be negative.
- **Match Identification**: Matches are uniquely identified by the combination of home and away teams.

## License

ISC 