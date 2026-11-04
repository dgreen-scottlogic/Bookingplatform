const userLogins = [
    {email: 'testingaccount@email.com', password: 'testing', expectedURL: '/lakeview-bowls'},
    {email: 'noclub@email.com', password: 'no', expectedURL: '/dashboard'},
    {email: 'admin@lakeview.club', password: 'club123', expectedURL: '/lakeview-bowls'},
    {email: 'admin@wlbooking.com', password: 'admin123', expectedURL: '/dashboard'}
];

export default userLogins