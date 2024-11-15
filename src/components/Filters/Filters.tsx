import React, { useState } from "react";
import { HiOutlineAdjustments } from "react-icons/hi";
import { HiOutlineX } from "react-icons/hi";
import "./Filters.css";

interface FiltersProps {
  filters: any;
  handleFilterChange: (name: string, value: string | boolean) => void;
  applyFilters: () => void;
}

const Filters: React.FC<FiltersProps> = ({
  filters,
  handleFilterChange,
  applyFilters,
}) => {
  const [isPopupOpen, setPopupOpen] = useState(false);
  const emptyFilters =
    !filters.cobroDatafono && !filters.cobroLinkPago && !filters.verTodos;

  const togglePopup = () => {
    setPopupOpen(true);
  };

  const closeFilters = () => {
    setPopupOpen(false);
  };

  // useEffect(() => {
  //   if (
  //     (filters.cobroDatafono || filters.cobroLinkPago) &&
  //     filters.verTodos === true
  //   ) {
  //     handleFilterChange("verTodos", false);
  //   }
  // }, [filters, handleFilterChange]);

  return (
    <div className="filters-container">
      <div className="filters" onClick={togglePopup}>
        <span className="filters-text">Filtros</span>
        <HiOutlineAdjustments className="filters-icon" />
      </div>

      {isPopupOpen && (
        <div className="popup">
          <div className="popup-content">
            <h2>Filtrar</h2>

            <div className="close-btn" onClick={closeFilters}>
              <HiOutlineX className="close-icon" />
            </div>

            <div className="checkbox-group">
              <div className="checkbox-item">
                <input
                  type="checkbox"
                  id="cobroDatafono"
                  name="cobroDatafono"
                  checked={filters.cobroDatafono || false}
                  onChange={(e) =>
                    handleFilterChange(e.target.name, e.target.checked)
                  }
                />
                <label htmlFor="cobroDatafono">Cobro con datáfono</label>
              </div>
              <div className="checkbox-item">
                <input
                  type="checkbox"
                  id="cobroLinkPago"
                  name="cobroLinkPago"
                  checked={filters.cobroLinkPago || false}
                  onChange={(e) =>
                    handleFilterChange(e.target.name, e.target.checked)
                  }
                />
                <label htmlFor="cobroLinkPago">Cobro con link de Pago</label>
              </div>
              <div className="checkbox-item">
                <input
                  type="checkbox"
                  id="verTodos"
                  name="verTodos"
                  checked={filters.verTodos || false}
                  onChange={(e) =>
                    handleFilterChange(e.target.name, e.target.checked)
                  }
                />
                <label htmlFor="verTodos">Ver Todos</label>
              </div>
            </div>

            <button
              className="apply-btn"
              onClick={applyFilters}
              disabled={emptyFilters}
              style={{ opacity: emptyFilters ? 0.5 : 1 }}
            >
              Aplicar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Filters;
