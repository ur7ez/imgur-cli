import React from 'react';
import {VisibilityFilters} from '../actions/index';
import FilterLink from '../containers/FilterLink'

/**
 * область, где мы позволим пользователю менять текущую видимость gallery topics.
 */
export const Filter = () => (
    <p className="gallery-filter">
        <b>Filter</b>:{" "}
        <FilterLink filter={VisibilityFilters.SHOW_ALL}
                    title="show all (clears any filters)">All</FilterLink>
        {", "}
        <FilterLink filter={VisibilityFilters.SHOW_ALBUMS}
                    title="show only topics being in albums">Albums</FilterLink>
        {", "}
        <FilterLink filter={VisibilityFilters.SHOW_ANIMATED}
                    title="show all animated topics (including those being in albums">Animated</FilterLink>
        {", "}
        <FilterLink filter={VisibilityFilters.SHOW_IMAGES}
                    title="show images (incl. animated) topics">Images</FilterLink>
    </p>
);