import numpy as np

def fed_avg(updates):
    total = sum(u["samples"] for u in updates)

    avg_coef = np.zeros_like(updates[0]["coef"])
    avg_intercept = np.zeros_like(updates[0]["intercept"])

    for u in updates:
        weight = u["samples"] / total
        avg_coef += u["coef"] * weight
        avg_intercept += u["intercept"] * weight

    return avg_coef, avg_intercept