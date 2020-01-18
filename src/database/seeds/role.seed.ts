export const roleSeed = [
    {
        name: 'Owner',
        createdAt: new Date,
        privileges: [
            {
                group: {
                    name: 'posts'
                },
                permission: {
                    name: 'create'
                }
            }
        ]
    }
]