import copy

class HospitalNode:
    def __init__(self, hospital_id, X, y, base_model):
        self.id = hospital_id
        self.X = X
        self.y = y
        self.model = copy.deepcopy(base_model)

    def train(self):
        self.model.fit(self.X, self.y)
        acc = self.model.score(self.X, self.y)
        return self.model.coef_, self.model.intercept_, acc, len(self.X)