import { ResponseGrade } from "../interfaces/ResponseGrade";

export enum Concept {
    A = 'A',
    B = 'B',
    C = 'C',
    D = 'D',
    E = 'E',
    F = 'F',
}

export function fromScore(score: number): Concept {
    if (score >= 9) return Concept.A;
    else if (score >= 7) return Concept.B;
    else if (score >= 5) return Concept.C;
    else if (score >= 4) return Concept.D;
    else if (score >= 2) return Concept.E;
    else return Concept.F;
}

export function calculateFinalAverageAndSituation(grades: ResponseGrade[]): { average: number | null; finalAverage: number | null; situation: string | null } {
    const av1 = grades.find((grade) => grade.evaluationType === 'AV1')?.evaluation;
    const av2 = grades.find((grade) => grade.evaluationType === 'AV2')?.evaluation;
    const av3 = grades.find((grade) => grade.evaluationType === 'AV3')?.evaluation;
    const av4 = grades.find((grade) => grade.evaluationType === 'AV4')?.evaluation;
    const recovery = grades.find((grade) => grade.evaluationType === 'RECOVERY')?.evaluation;

    const allGradesAvailable = av1 !== undefined && av2 !== undefined && av3 !== undefined && av4 !== undefined;

    let average: number | null = null;
    let finalAverage: number | null = null;
    let situation: string | null = null;

    if (allGradesAvailable) {
        const total = (Number(av1) + Number(av2) + Number(av3) + Number(av4));
        const gradesAverage = total / 4;
        average = Number(gradesAverage.toFixed(2));

        const recoveryScore = recovery !== undefined ? Number(recovery) : null;

        if (gradesAverage >= 7 || (recoveryScore !== null && gradesAverage >= 5)) {
            finalAverage = gradesAverage >= 7 ? gradesAverage : (gradesAverage + Number(recoveryScore)) / 2;
            situation = fromScore(finalAverage);
        } else if (recoveryScore !== null) {
            finalAverage = (gradesAverage + recoveryScore) / 2;
            situation = fromScore(finalAverage);
        } else {
            finalAverage = gradesAverage;
            situation = fromScore(finalAverage);
        }
    }

    return { average, finalAverage, situation };
}