class User {

    #friends = []
    #posts = []
    #settings

    constructor(username, id) {
        this.username = username
        this.id = id
    }

    get id() {
        return this.id
    }

    get username() {
        return this.username
    }

    set username(newUsername) {
        this.username = newUsername
    }

    get bio() {
        return this.bio
    }

    set bio(newBio) {
        this.bio = newBio
    }

    get settings() {
        return this.#settings
    }

    set settings(newSettings) {
        this.#settings = newSettings
    }

    get friends() {
        return this.#friends
    }

    addFriend(friend) {
        this.#friends.append(friend)
    }

    removeFriend(friend) {
        this.#friends.splice(this.#friends.indexOf(friend), 1)
    }

    get posts() {
        return this.#posts
    }

    addPost(post) {
        this.#posts.append(post)
    }

    removePost(post) {
        this.#posts.splice(this.#posts.indexOf(post), 1)
    }

    toFirestore() {
        return {
            username: this.username,
            id: this.id,
            bio: this.bio,
            friends: this.#friends,
            posts: this.#posts,
            settings: this.#settings
        }
    }
}

export default User