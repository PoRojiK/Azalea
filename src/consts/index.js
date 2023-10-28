
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
