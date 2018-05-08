import fetch from '@/utils/fetch';

export function deleteArticle({ params }) {
    return fetch({
        url: `/deleteArticle/${params.id}`,
        method: 'get'
    })
}

export function getArticleList({ params }) {
    return fetch({
        url: '/articleLists',
        method: 'post',
        data: params
    })
}

export function addArticle({ params }) {
    return fetch({
        url: '/addArticle',
        method: 'post',
        data: params
    })
}

export function getArticleById({ params }) {
    return fetch({
        url: `/articleFind/${params.id}`,
        method: 'get'
    })
}

export function articleUpdate({ params }) {
    return fetch({
        url: '/articleUpdate',
        method: 'post',
        data: params
    })
}

export function findArticleByClassify({ params }) {
    return fetch({
        url: '/findByClassify',
        method: 'post',
        data: params
    })
}

export function login({ params }) {
    return fetch({
        url: '/login',
        method: 'post',
        data: params
    })
}
