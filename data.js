let shows = [
    { title:'Chicago', venue: 'Paramount Theater', price: '$$$' },
    { title:'Singing in the Rain', venue: '5th Avenue Theater', price: '$$' },
    { title:'King Lear', venue: 'Seattle Center Theater', price: '$' },
    { title:'PNB's The Nutcracker', venue: 'McCaw Hall', price: '$$' },
    { title:'Bette Midler', venue: 'Seattle Center's Key Arena', price: '$$$$' }
];

const getAll = () =>
{
    return shows;
}

const get = (title) => {
    return shows.find((show) => {
        return show.title == title;
    });
}

const delete = (title) => {
    return shows.find((show) => {
        delete show.title == title;
    });
}
