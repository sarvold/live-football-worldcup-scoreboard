export interface Match {
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
  totalScore: number;
  startTime: Date;
}

export class Scoreboard {
  private matches: Map<string, Match> = new Map();

  private getMatchKey(homeTeam: string, awayTeam: string): string {
    return `${homeTeam}-${awayTeam}`;
  }

  public startMatch(homeTeam: string, awayTeam: string): void {
    const matchKey = this.getMatchKey(homeTeam, awayTeam);
    
    if (this.matches.has(matchKey)) {
      throw new Error('Match already exists');
    }

    this.matches.set(matchKey, {
      homeTeam,
      awayTeam,
      homeScore: 0,
      awayScore: 0,
      totalScore: 0,
      startTime: new Date()
    });
  }

  public updateScore(homeTeam: string, awayTeam: string, homeScore: number, awayScore: number): void {
    if (homeScore < 0 || awayScore < 0) {
      throw new Error('Scores cannot be negative');
    }

    const matchKey = this.getMatchKey(homeTeam, awayTeam);
    const match = this.matches.get(matchKey);

    if (!match) {
      throw new Error('Match not found');
    }

    this.matches.set(matchKey, {
      ...match,
      homeScore,
      awayScore,
      totalScore: homeScore + awayScore
    });
  }

  public getSummary(): Match[] {
    return Array.from(this.matches.values());
  }
} 