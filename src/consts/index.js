
export const CategoriesData = [
    {
        title: "flower_basket",
        name: "Подарки",
        image: require("../assets/images/flower_basket.png"),
    },
    {
        title: "author_flower",
        name: "Авторские \nбукеты",
        image: require("../assets/images/author_flower.png"),
    },
    {
        title: "roses",
        name: "Монобукеты",
        image: require("../assets/images/roses.png"),
    },
    
    {
        title: "teddy",
        name: "Мягкие\nигрушки",
        image: require("../assets/images/teddy.png"),
    },
    {
        title: "cake",
        name: "Вкусное",
        image: require("../assets/images/cake.png"),
    },
]
export const RowData = () => {
    const firstRowCategories = CategoriesData.slice(0, 2);
    const secondRowCategories = CategoriesData.slice(2);
    return {
        firstRowCategories,
        secondRowCategories,
    };
}
export const Banner_data = [
    {
        title: "important_notification",
        name: "ВАЖНЫЕ\nНАПОМИНАНИЯ",
        bottom_text: "Пишите дни рождения дорогих людей,\nа мы напомним, когда их поздравить!",
        image: require("../assets/images/banner1.png"),
        image1: require("../assets/images/banner_arrow.png"),
    },
    {
        title: "sales",
        name: "СКИДКИ В ВАШ\nДЕНЬ РОЖДЕНИЯ",
        bottom_text: "Укажите ваш день рождения в профиле,\nв этот день у вас будет скидка на заказ!",
        image: require("../assets/images/banner2.png"),
        image1: require("../assets/images/banner_arrow1.png"),
    },
]