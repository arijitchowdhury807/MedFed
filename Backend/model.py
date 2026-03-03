from sklearn.linear_model import LogisticRegression

def create_model():
    return LogisticRegression(
        max_iter=5,        # only 1 local epoch per round
        warm_start=True,   # continue from previous weights
        solver="lbfgs"
    )