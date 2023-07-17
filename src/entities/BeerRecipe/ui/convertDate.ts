export const convertDate = (dateString:string) => {
    const dateParts = dateString.split('/');
    const month = Number(dateParts[0]);
    const year = Number(dateParts[1]);

    const date = new Date(year, month - 1);

    const newDateFormat = date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

    return newDateFormat;
};
