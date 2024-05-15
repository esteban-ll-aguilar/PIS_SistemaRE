class Node(object):
    def __init__(self,data, next=None):
        self.__data = data
        self.__next = next

    @property
    def _data(self):
        return self.__data

    @_data.setter
    def _data(self, value):
        self.__data = value

    @property
    def _next(self):
        return self.__next

    @_next.setter
    def _next(self, value):
        self.__next = value




