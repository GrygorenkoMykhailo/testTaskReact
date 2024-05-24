# Тестове завдання на вакансію Junior React Frontend Developer

[Посилання на вакансію](https://djinni.co/jobs/652218-junior-react-frontend-developer/)

## Виконано за допомогою
- Vite
- Tyescript
- React
- React-Router
- Tailwind

## Посилання на деплой проекту
[Деплой проекту](https://test-task-react-one.vercel.app/)

## Документація проекту

### Перший елемент який бачить користувач - QuizListComponent
Він містить в собі функціонал переходу, проходження, додавання та видалення вікторини.

### QuizComponent
Коли користувач натискає на кнопку "Pass Quiz", він переходить до компоненту QuizComponent, який по черзі "задає" питання користувачеві. Кожне питання передається у елемент QuizQuestionComponent, а в кінці тесту передає результати тестування до компоненту ResultsComponent.

### EditQuizComponent
Якщо потрібно відредагувати тест, можна натиснути на кнопку "Edit Quiz", який перемістить користувача до компоненту EditQuizComponent. Він містить в собі функціонал зміни назви тесту а також додавання нових питань за допомогою елементу AddQuizQuestionComponent. Кожне питання редагується окремо в компоненті EditQuizQuestionComponent.

### ErrorComponent
У разі помилки користувача перенесе на ErrorComponent, який містить в собі стандартне повідомлення про помилку.

### Був реалізован весь базовий функціонал та більша частина додаткового:
З основного:
- Список можливих вікторин
- Можливість додати нову вікторину
- Можливість видалити вікторину
- Можливість редагувати вікторину
- При створенні вікторини можливість сформувати питання (додати / видалити) і можливі відповіді для них (динамічна кількість відповідей буде плюсом), також позначити правильну відповідь, за яку при проходженні вікторини буде зараховуватись бал
- При редагуванні можливість змінити кількість питань (додати / видалити)
- Можливість проходити вікторину і отримувати кінцевий результат
З додаткового:
- Можливість пошуку вікторини за іменем
- Реалізація таймер виконання вікторини
- Динамічна кількість відповідей на питання
- Можливість налаштування кількості балів за питання
- Можливість після проходження переглядати свої відповіді