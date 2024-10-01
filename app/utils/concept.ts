export enum Concept {
    A = 'A', // 9-10
    B = 'B', // 7-8.9
    C = 'C', // 5-6.9
    D = 'D', // 4-4.9
    E = 'E', // 2-3.9
    F = 'F', // 0-1.9
}

export function fromScore(score: number): Concept {
    if (score >= 9) return Concept.A;
    else if (score >= 7) return Concept.B;
    else if (score >= 5) return Concept.C;
    else if (score >= 4) return Concept.D;
    else if (score >= 2) return Concept.E;
    else return Concept.F;
}
