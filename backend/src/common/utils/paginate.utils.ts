export const paginate = ({page}) => {
    const offset = page.page * page.pageSize;
    const limit = page.pageSize;

    return {
        offset: offset,
        limit: limit
    }
}

