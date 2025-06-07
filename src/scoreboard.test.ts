import { Scoreboard } from './scoreboard';

describe('Scoreboard', () => {
  let scoreboard: Scoreboard;

  beforeEach(() => {
    scoreboard = new Scoreboard();
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
        startTime: expect.any(Date)
      });
    });

    it('should throw error when trying to start a match with same teams', () => {
      // Arrange
      const team = 'Mexico';
      scoreboard.startMatch(team, 'Canada');

      // Act & Assert
      expect(() => scoreboard.startMatch(team, 'Canada')).toThrow('Match already exists');
    });
  });
}); 