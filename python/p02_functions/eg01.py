def empty_function():
    pass


def pass_arguments(a, b):
    return a + b


print("pass_arguments(a, b)", pass_arguments(1, 2))


def pass_unlimited_arguments(*nums):
    result = 0
    for num in nums:
        result += num
    return result


print("pass_unlimited_arguments(*nums)", pass_unlimited_arguments(1, 2, 3))


def tuple_arg_and_return(my_tuple):
    result = 0
    for num in my_tuple:
        result += num
    return result


print("tuple_arg_and_return(my_tuple)", tuple_arg_and_return((1, 2, 3)))


def default_arg_value(a=1, b=2):
    return a + b


print("default_arg_value(a=1, b=2)", default_arg_value(3))


def call_by_arg_name(a, b, c):
    return a + b + c


print("call_by_arg_name(a, b, c)", call_by_arg_name(1, c=5, b=6))


def dictionary_arg(**user):
    return user


print("dictionary_arg(**user)", dictionary_arg(id=100, name="Sheraz"))

