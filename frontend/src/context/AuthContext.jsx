import React, { createContext, useState, useContext } from 'react'


type User = { id: number; name: string; role: string } | null


const AuthContext = createContext<any>(null)


export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
const [user, setUser] = useState<User>(null)
const [pendingFilters, setPendingFilters] = useState<any>(null)


return (
<AuthContext.Provider value={{ user, setUser, pendingFilters, setPendingFilters }}>
{children}
</AuthContext.Provider>
)
}


export const useAuth = () => useContext(AuthContext)