import numpy as np

def fed_avg(updates):
    total = sum(u["samples"] for u in updates)

    avg_coef = sum(
        u["coef"] * (u["samples"] / total)
        for u in updates
    )

    avg_intercept = sum(
        u["intercept"] * (u["samples"] / total)
        for u in updates
    )

    return avg_coef, avg_intercept