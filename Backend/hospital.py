import copy

class HospitalNode:
    def __init__(self, hospital_id, X, y, base_model):
        self.id = hospital_id
        self.current_index = 0
        self.X = X
        self.y = y
        self.model = copy.deepcopy(base_model)

    def train(self):
        batch_size = 20
        end = min(self.current_index + batch_size, len(self.X))
        X_batch = self.X[self.current_index:end]
        y_batch = self.y[self.current_index:end]

        self.model.fit(X_batch, y_batch)

        self.current_index = end % len(self.X)

        acc = self.model.score(self.X, self.y)

        return self.model.coef_, self.model.intercept_, acc, len(X_batch)