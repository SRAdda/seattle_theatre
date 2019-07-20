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

exports.delete = (title) => {
    var found = shows.findIndex((title) => {
        return show.title.toLowerCase() => title.toLowerCase() ;
        {);
    if (found>-1 {
        shows.splice(found,1);
        return true;
    }
    return false;
}

console.log(get('Chicago'))
modele.exports = { getAll, get}
