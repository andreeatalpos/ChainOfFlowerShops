package com.example.server.model.persistenta;


import com.example.server.model.FloareFlorarie;
import com.example.server.model.Florarie;
import com.example.server.model.repository.FloareRepository;
import com.example.server.model.repository.FlorarieRepository;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Data
@Service
public class PersistentaFlorarie {

    @Autowired
    private FlorarieRepository florarieRepository;

    @Autowired
    private FloareRepository floareRepository;

    public Florarie getFlorarie(String florarie) {
        return florarieRepository.findByDenumire(florarie);
    }

    public void addFlorarie(Florarie florarie) {
        florarieRepository.save(florarie);
    }

    public List<FloareFlorarie> searchByDenumire(String denumire) {
        return floareRepository.findAllByDenumire(denumire);
    }

    public void updateFlorarie(Florarie florarie) {
        florarieRepository.save(florarie);
    }

    public List<FloareFlorarie> getFlori(String florarie) {
        List<FloareFlorarie> flori = florarieRepository.findByDenumire(florarie).getFlori();
        Comparator<FloareFlorarie> comparedByColorAndPrice = Comparator
                .comparing(FloareFlorarie::getCuloare)
                .thenComparing(FloareFlorarie::getPret);

        List<FloareFlorarie> sorted = flori.stream()
                .sorted(comparedByColorAndPrice)
                .collect(Collectors.toList());

        return sorted;
    }

    public FloareFlorarie addFloare(String florarie, FloareFlorarie floare) {
        if (florarieRepository.findByDenumire(florarie) != null) {
            if (!florarieRepository.findByDenumire(florarie).getFlori().contains(floareRepository.findByDenumireAndCuloare(floare.getDenumire(), floare.getCuloare()))) {
                florarieRepository.findByDenumire(florarie).getFlori().add(floare);
                this.updateFlorarie(florarieRepository.findByDenumire(florarie));
                return floare;
            }
        }
        return null;
    }

    public FloareFlorarie updateFloare(FloareFlorarie floare, String florarie) {
        if (florarieRepository.findByDenumire(florarieRepository.findByDenumire(florarie).getDenumire()) != null) {
            if (florarieRepository.findByDenumire(florarie).getFlori().contains(floareRepository.findByDenumireAndCuloare(floare.getDenumire(), floare.getCuloare()))) {
                FloareFlorarie current = floareRepository.findByDenumireAndCuloare(floare.getDenumire(), floare.getCuloare());
                if (!current.getCuloare().equals(floare.getCuloare()) || current.getCantitate() != floare.getCantitate() || current.getPret() != floare.getPret() || !current.getDisponibilitate().equals(floare.getDisponibilitate())) {
                    florarieRepository.findByDenumire(florarie).getFlori().remove(current);
                    current.setPret(floare.getPret().toString());
                    current.setCantitate(floare.getCantitate().toString());
                    current.setDisponibilitate(floare.getDisponibilitate().toString());
                    florarieRepository.findByDenumire(florarie).getFlori().add(current);
                    this.updateFlorarie(florarieRepository.findByDenumire(florarie));
                    return current;
                }


            }
        }
        return null;
    }

    public boolean deleteFloare(String denumire, String culoare, String florarie) {
        if (florarieRepository.findByDenumire(florarieRepository.findByDenumire(florarie).getDenumire()) != null) {
            if (floareRepository.findByDenumireAndCuloare(denumire, culoare) != null) {
                florarieRepository.findByDenumire(florarie).getFlori().remove(floareRepository.findByDenumireAndCuloare(denumire, culoare));
                this.updateFlorarie(florarieRepository.findByDenumire(florarie));
                return true;
            }
        }
        return false;
    }

    public FloareFlorarie searchFloare(String denumire, String culoare, String florarie) {
        if (florarieRepository.findByDenumire(florarieRepository.findByDenumire(florarie).getDenumire()) != null) {
            {
                if (floareRepository.findByDenumireAndCuloare(denumire, culoare) != null) {
                    if (florarieRepository.findByDenumire(florarie).getFlori().contains(floareRepository.findByDenumireAndCuloare(denumire, culoare))) {
                        return floareRepository.findByDenumireAndCuloare(denumire, culoare);
                    }
                }
            }
        }
        return null;
    }
}
