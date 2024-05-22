
export const initialFilters = {
    nameSearch: "",
    emailSearch: "",
    activeFilters: {
        nameSearch: false,
        emailSearch: false
    }
}

export const filterByName = (keyword, setFilter) => setFilter((prevFilters) => ({
    ...prevFilters,
    nameSearch: keyword.trim().toLowerCase()
        .replace(/ /g, '').replace(/\W|_/g, ''),
    activeFilters: {
        ...prevFilters,
        nameSearch: true,
    }
}));

export const filterByEmail = (keyword, setFilter) => setFilter((prevFilters) => ({
    ...prevFilters,
    emailSearch: keyword.trim().toLowerCase()
        .replace(/ /g, '').replace(/[^a-zA-Z0-9@.]/g, ''),
    activeFilters: {
        ...prevFilters,
        emailSearch: true,
    }
}));

export const applyFilters = ({ data, filter, setEventMembers }) => {

    let filteredMembers = data;
    const { activeFilters, nameSearch, emailSearch } = filter

    if (activeFilters.nameSearch) {
        filteredMembers = filteredMembers.filter(({ fullName }) => fullName.trim().toLowerCase().replace(/ /g, '').includes(nameSearch))
    }

    if (activeFilters.emailSearch) {
        filteredMembers = filteredMembers.filter(({ email }) => email.toLowerCase()
            .replace(/ /g, '').includes(emailSearch))
    }

    if (activeFilters.nameSearch && activeFilters.emailSearch) {
        filteredMembers = filteredMembers.filter(({ fullName, email }) =>
            fullName.toLowerCase().includes(nameSearch) &&
            email.toLowerCase().includes(emailSearch)
        );
    }

    setEventMembers(filteredMembers)
}