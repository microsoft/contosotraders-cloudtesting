import React, { Component } from "react";
import { NamespacesConsumer } from "react-i18next";
import SidebarAccordion from "./components/sidebaraccordion";
class ListAside extends Component {
    constructor() {
        super();
        this.filterPanel = React.createRef();
        this.state = {
            isopened: false,
            showComponent: false,

        };
        this.openFilterPanel = this.openFilterPanel.bind(this);
    }

    componentDidMount() {
        const setComponentVisibility = this.setComponentVisibility.bind(this);
        setComponentVisibility(document.documentElement.clientWidth);
        window.addEventListener("resize", function() {
            setComponentVisibility(document.documentElement.clientWidth);
        });
    }

    setComponentVisibility(width) {
        if (width > 768) {
            this.setState({ showComponent: true });
        } else {
            this.setState({ showComponent: false, isopened: false });
        }
    }

    toggleClass = () => {
        document.body.classList.toggle("u-overflow-hidden");
        this.setState(prevState => ({
            isopened: !prevState.isopened,
            showComponent: !prevState.showComponent,
        }));
    };

    openFilterPanel() {
        if (this.state.showComponent === false) {
            this.setState(
                {
                    showComponent: true,
                    isopened: true,
                },
                () => {
                    let currentPosition = window.pageYOffset;
                    this.filterPanel.current.style.top = `${currentPosition}px`;
                    document.body.classList.toggle("u-overflow-hidden");
                }
            );
        }
    }

    render() {
        return (
            <NamespacesConsumer>
                {t => (
                    <aside className="list__aside">
                        <SidebarAccordion 
                            onFilterChecked={this.props.onFilterChecked}
                            data={this.props.brandsList}
                            title="Brands"
                            id="brand"
                        />
                        {/* {this.state.showComponent && (
                            <div className={ this.state.isopened ? "list__panel is-opened" : "list__panel" } ref={this.filterPanel}>
                                <CheckboxContainer
                                    onFilterChecked={this.props.onFilterChecked}
                                    data={typesList}
                                    title="Cordless Power Tools"
                                    id="type"
                                />

                                <CheckboxContainer
                                    onFilterChecked={this.props.onFilterChecked}
                                    data={brandsList}
                                    title="Brands"
                                    id="brand"
                                />

                                <button className="btn btn--primary" onClick={this.toggleClass}>
                                    {t("list.aside.close")}
                                </button>
                            </div>
                        )} */}
                    </aside>
                )}
            </NamespacesConsumer>
        );
    }
}

export default ListAside;
