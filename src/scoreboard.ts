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

  private isTeamInMatch(team: string): boolean {
    return Array.from(this.matches.values()).some(
      match => match.homeTeam === team || match.awayTeam === team
    );
  }

  public startMatch(homeTeam: string, awayTeam: string): void {
    const matchKey = this.getMatchKey(homeTeam, awayTeam);
    
    if (this.matches.has(matchKey)) {
      throw new Error('Match already exists');
    }

    const homeTeamInMatch = this.isTeamInMatch(homeTeam);
    const awayTeamInMatch = this.isTeamInMatch(awayTeam);

    if (homeTeamInMatch && awayTeamInMatch) {
      throw new Error('Both teams are already in matches');
    } else if (homeTeamInMatch) {
      throw new Error(`Team ${homeTeam} is already in a match`);
    } else if (awayTeamInMatch) {
      throw new Error(`Team ${awayTeam} is already in a match`);
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

  public finishMatch(homeTeam: string, awayTeam: string): void {
    const matchKey = this.getMatchKey(homeTeam, awayTeam);
    
    if (!this.matches.has(matchKey)) {
      throw new Error('Match not found');
    }

    this.matches.delete(matchKey);
  }

  public getSummary(): Match[] {
    return Array.from(this.matches.values())
      .sort((a, b) => {
        // First sort by total score (descending)
        if (b.totalScore !== a.totalScore) {
          return b.totalScore - a.totalScore;
        }
        // If scores are equal, sort by start time (most recent first)
        return b.startTime.getTime() - a.startTime.getTime();
      });
  }
} 