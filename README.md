# cargo.lt
Test task from Cargo.lt

Имеется поле input, в котором через запятую введены данные в формате:

<День недели>: < время работы>. Пример: "Пн: 8:00, Вт: 15:00, Вт: 16:00, Ср: 17:30";

Напишите JS функцию, которая на вход принимает данную строку и форматирует ее таким

образом, чтобы все подряд идущие минуты в предлелах одного дня заменялись на тире, а

дни отделялись точкой с запятой.

Пример:

Входная строка "Пн: 8:00, Вт: 15:00, Вт: 15:30, Вт: 16:00, Вт: 17:00, Ср: 17:30";

Выходная строка "Пн: 8:00; Вт: 15:00-16:00, 17:00; Ср: 17:30";

Условия:

1. За ШАГ брать пол часа.

2. Время и дни могут идти не по порядку, например:

"Ср: 17:30, Пн: 8:00, Вт: 15:30, Вт: 15:00, Вт: 16:00";

3. В выходной строке все должно идти по порядку.
