let shows = [
    { title:'Chicago', venue: 'Paramount Theater', price: '$$$' },
    { title:'Singing in the Rain', venue: '5th Avenue Theater', price: '$$' },
    { title:'King Lear', venue: 'Seattle Center Theater', price: '$' },
    { title:'PNB\'s The Nutcracker', venue: 'McCaw Hall', price: '$$' },
    { title:'Bette Midler', venue: 'Seattle Center\'s Key Arena', price: '$$$$' }
];

exports.getAll = () => {
    return shows;
};

exports.getItem = (title) => {
    return shows.find((item) => {
        return item.title.toLowerCase() === title.toLowerCase();
    });
};

exports.deleteItem = (title) => {
    const oldLength = shows.length;
    shows = shows.filter((item) => {
        return item.title.toLowerCase() !== title.toLowerCase();
    });

    return oldLength !== shows.length;
};

exports.addItem = (newShow) => {
    const oldLength = shows.length;
    // use existing get() method to check if show already in our list
    let found = this.getItem(newShow.title);
    if (!found) {
        shows.push(newShow);
    }
    //if old and new array lengths differ, item was added
    return {added: oldLength !== shows.length, total: shows.length };
};
