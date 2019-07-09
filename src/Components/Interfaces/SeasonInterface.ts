
export interface Season {
    current?: boolean,
    year?: string,
    general?: Basic,
    metrics?: Metrics
}

export interface Metrics {
    data?: Array<number>,
    pp?: number,
    pk?: number,
    cf?: number,
    xgf?: number,
    scf?: number,
    pdo?: number
}

export interface Basic {
    data?: Array<number>,
    wins?: number,
    losses?: number,
    ot?: number,
    points?: number,
    row?: number,
    gf?: number,
    ga?: number
}