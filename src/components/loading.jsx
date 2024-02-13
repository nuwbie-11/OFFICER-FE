export default function Loading({variant = 'default'}) {
    if(variant === 'mini') {
        return (
            <section className="d-flex justify-content-center align-items-center flex-column my-auto gap-4" style={{ height: "72.5vh" }}>
                <div className="spinner-border" role="status" style={{ width: "4rem", height: "4rem" }}>
                    <span className="visually-hidden">Loading...</span>
                </div>
                <h5>Loading...</h5>
            </section>
        )
    }

    return (
        <section className="d-flex justify-content-center align-items-center flex-column my-auto gap-4" style={{ height: "100vh" }}>
            <div className="spinner-border" role="status" style={{ width: "4rem", height: "4rem" }}>
                <span className="visually-hidden">Loading...</span>
            </div>
            <h5>Loading...</h5>
        </section>
    )
}