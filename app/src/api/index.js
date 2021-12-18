import axios from "axios"



export async function createRepoContent({userLogin,token,Content,name}) {
    console.log(userLogin,token)
    const headers = {
        "Authorization": `token ${token}`,
        "Accept": "application/vnd.github.v3+json",
    }
    const res = await axios(
        {
            method: "PUT",
            url: `https://api.github.com/repos/${userLogin}/${name}/contents/index.html`,
            headers,
            data: {
                message: "initial commit",
                content: Content
            }
        }
    )
    return res
    // http PUT https://api.github.com/repos/lee-dohm/test-repo/contents/hello.txt \
    // "Authorization: token REDACTED-TOKEN" \
    // message="my commit message" \
    // committer:="{ \"name\": \"Lee Dohm\", \"email\": \"1038121+lee-dohm@users.noreply.github.com\" }" \
    // content="bXkgbmV3IGZpbGUgY29udGVudHM="
}


export async function createARepo({name,description,token}) {
    const headers = {
        "Authorization": `token ${token}`,
        "Accept": "application/vnd.github.v3+json",
    }
    const {data} = await axios(
        {
            method: "POST",
            url: "https://api.github.com/user/repos",
            data: {name,description,auto_init: true},
            headers
        }
    )
    return data
    // console.log(res)
}

