from controls.tda.stack.stackOperation import StackOperation
class Stack:
    def __init__(self, tope):
        self.__stack = StackOperation(tope)



    def push(self, data):
        self.__stack.push(data)
    
    @property
    def pop(self):
        return self.__stack.pop
    
    @property
    def print(self):
        self.__stack.print

    @property
    def verify(self):
        return self.__stack.verifyTop