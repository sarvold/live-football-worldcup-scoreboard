import { Scoreboard } from './scoreboard';

describe('Scoreboard', () => {
  let scoreboard: Scoreboard;
  let mockDate: Date;

  beforeEach(() => {
    scoreboard = new Scoreboard();
    mockDate = new Date('2024-01-01T00:00:00Z');
    jest.useFakeTimers();
    jest.setSystemTime(mockDate);
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  describe('startMatch', () => {
    it('should start a new match with initial score 0-0', () => {
      // Arrange
      const homeTeam = 'Mexico';
      const awayTeam = 'Canada';

      // Act
      scoreboard.startMatch(homeTeam, awayTeam);

      // Assert
      const summary = scoreboard.getSummary();
      expect(summary).toHaveLength(1);
      expect(summary[0]).toEqual({
        homeTeam,
        awayTeam,
        homeScore: 0,
        awayScore: 0,
        totalScore: 0,
        startTime: mockDate
      });
    });

    it('should throw error when trying to start a match with same teams', () => {
      // Arrange
      const team = 'Mexico';
      scoreboard.startMatch(team, 'Canada');

      // Act & Assert
      expect(() => scoreboard.startMatch(team, 'Canada')).toThrow('Match already exists');
    });

    it('should throw error when trying to start a match with a team already in another match', () => {
      // Arrange
      scoreboard.startMatch('Mexico', 'Canada');

      // Act & Assert
      expect(() => scoreboard.startMatch('Mexico', 'Brazil')).toThrow('Team Mexico is already in a match');
      expect(() => scoreboard.startMatch('Brazil', 'Canada')).toThrow('Team Canada is already in a match');
    });

    it('should throw error when both teams are already in different matches', () => {
      // Arrange
      scoreboard.startMatch('Mexico', 'Canada');
      scoreboard.startMatch('Brazil', 'Argentina');

      // Act & Assert
      expect(() => scoreboard.startMatch('Mexico', 'Brazil')).toThrow('Both teams are already in matches');
    });
  });

  describe('updateScore', () => {
    it('should update the score of an existing match', () => {
      // Arrange
      const homeTeam = 'Argentina';
      const awayTeam = 'Australia';
      scoreboard.startMatch(homeTeam, awayTeam);

      // Act
      scoreboard.updateScore(homeTeam, awayTeam, 6, 0);

      // Assert
      const summary = scoreboard.getSummary();
      expect(summary[0]).toEqual({
        homeTeam,
        awayTeam,
        homeScore: 6,
        awayScore: 0,
        totalScore: 6,
        startTime: mockDate
      });
    });

    it('should throw error when trying to update non-existent match', () => {
      // Act & Assert
      expect(() => scoreboard.updateScore('Argentina', 'Australia', 6, 0))
        .toThrow('Match not found');
    });

    it('should throw error when trying to update with negative scores', () => {
      // Arrange
      scoreboard.startMatch('Argentina', 'Australia');

      // Act & Assert
      expect(() => scoreboard.updateScore('Argentina', 'Australia', -1, 1))
        .toThrow('Scores cannot be negative');
      expect(() => scoreboard.updateScore('Argentina', 'Australia', 0, -1))
        .toThrow('Scores cannot be negative');
    });
  });

  describe('finishMatch', () => {
    it('should remove a match from the scoreboard', () => {
      // Arrange
      scoreboard.startMatch('Spain', 'Brazil');
      expect(scoreboard.getSummary()).toHaveLength(1);

      // Act
      scoreboard.finishMatch('Spain', 'Brazil');

      // Assert
      expect(scoreboard.getSummary()).toHaveLength(0);
    });

    it('should throw error when trying to finish a non-existent match', () => {
      // Act & Assert
      expect(() => scoreboard.finishMatch('Uruguay', 'Italy')).toThrow('Match not found');
    });

    it('should not affect other matches when one is finished', () => {
      // Arrange
      scoreboard.startMatch('Germany', 'France');
      scoreboard.startMatch('Mexico', 'Canada');
      expect(scoreboard.getSummary()).toHaveLength(2);

      // Act
      scoreboard.finishMatch('Germany', 'France');

      // Assert
      const summary = scoreboard.getSummary();
      expect(summary).toHaveLength(1);
      expect(summary[0].homeTeam).toBe('Mexico');
      expect(summary[0].awayTeam).toBe('Canada');
    });
  });

  describe('getSummary', () => {
    it('should return matches ordered by total score and start time', () => {
      // Arrange
      // Start matches in specific order with different start times
      scoreboard.startMatch('Mexico', 'Canada');
      jest.advanceTimersByTime(1000);
      scoreboard.startMatch('Spain', 'Brazil');
      jest.advanceTimersByTime(1000);
      scoreboard.startMatch('Germany', 'France');
      jest.advanceTimersByTime(1000);
      scoreboard.startMatch('Uruguay', 'Italy');
      jest.advanceTimersByTime(1000);
      scoreboard.startMatch('Argentina', 'Australia');

      // Update scores to match the example
      scoreboard.updateScore('Mexico', 'Canada', 0, 5);
      scoreboard.updateScore('Spain', 'Brazil', 10, 2);
      scoreboard.updateScore('Germany', 'France', 2, 2);
      scoreboard.updateScore('Uruguay', 'Italy', 6, 6);
      scoreboard.updateScore('Argentina', 'Australia', 3, 1);

      // Act
      const summary = scoreboard.getSummary();

      // Assert
      expect(summary).toHaveLength(5);
      expect(summary[0]).toEqual(expect.objectContaining({
        homeTeam: 'Uruguay',
        awayTeam: 'Italy',
        totalScore: 12
      }));
      expect(summary[1]).toEqual(expect.objectContaining({
        homeTeam: 'Spain',
        awayTeam: 'Brazil',
        totalScore: 12
      }));
      expect(summary[2]).toEqual(expect.objectContaining({
        homeTeam: 'Mexico',
        awayTeam: 'Canada',
        totalScore: 5
      }));
      expect(summary[3]).toEqual(expect.objectContaining({
        homeTeam: 'Argentina',
        awayTeam: 'Australia',
        totalScore: 4
      }));
      expect(summary[4]).toEqual(expect.objectContaining({
        homeTeam: 'Germany',
        awayTeam: 'France',
        totalScore: 4
      }));
    });
  });
}); 